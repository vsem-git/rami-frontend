/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Babel plugin — transforms JSX elements marked with `data-editable` into
 * `<EditableNode>` components at build time.
 *
 * Usage in component files:
 *   <h1 data-editable="page.section.field">Оригинальный текст</h1>
 *   <img data-editable="page.section.img" src="/img.jpg" />
 *   <p  data-editable="page.section.bio" data-editable-type="richtext">…</p>
 *   <p  data-editable="page.section.bio" data-editable-type="richtext"
 *       data-editable-fallback="<b>Bold</b> plain text">…mixed JSX…</p>
 *
 * The import for EditableNode is injected automatically.
 */

const EDITABLE_IMPORT = "@/components/EditableNode";

/**
 * Creates a string literal that preserves non-ASCII characters as-is.
 * By default Babel escapes them to \uXXXX — setting extra.raw prevents that.
 */
function strLit(t: any, value: string) {
    const node = t.stringLiteral(value);
    node.extra = { rawValue: value, raw: JSON.stringify(value) };
    return node;
}

export function editablePlugin({ types: t }: { types: any }) {
    return {
        name: "editable-transform",

        visitor: {
            Program: {
                enter(_path: any, state: any) {
                    state.hasEditable = false;
                },

                exit(programPath: any, state: any) {
                    if (!state.hasEditable) return;

                    // Skip the EditableNode file itself
                    const filename: string = state.filename ?? "";
                    if (filename.includes("EditableNode")) return;

                    const alreadyImported = programPath.node.body.some(
                        (node: any) =>
                            t.isImportDeclaration(node) &&
                            node.source.value === EDITABLE_IMPORT,
                    );

                    if (!alreadyImported) {
                        const decl = t.importDeclaration(
                            [
                                t.importSpecifier(
                                    t.identifier("EditableNode"),
                                    t.identifier("EditableNode"),
                                ),
                            ],
                            t.stringLiteral(EDITABLE_IMPORT),
                        );
                        programPath.unshiftContainer("body", decl);
                    }
                },
            },

            JSXElement(path: any, state: any) {
                const openingEl = path.node.openingElement;

                // Find data-editable attr
                const editableAttr = openingEl.attributes.find(
                    (attr: any) =>
                        t.isJSXAttribute(attr) &&
                        t.isJSXIdentifier(attr.name) &&
                        attr.name.name === "data-editable",
                );
                if (!editableAttr) return;
                if (!t.isStringLiteral(editableAttr.value)) return;

                const fieldId: string = editableAttr.value.value;

                // Only transform plain HTML elements (lowercase tag names)
                if (!t.isJSXIdentifier(openingEl.name)) return;
                const tagName: string = openingEl.name.name;
                if (tagName[0] !== tagName[0].toLowerCase()) return;

                // Detect optional data-editable-type attr
                const typeAttr = openingEl.attributes.find(
                    (attr: any) =>
                        t.isJSXAttribute(attr) &&
                        t.isJSXIdentifier(attr.name) &&
                        attr.name.name === "data-editable-type",
                );
                const isImage = tagName === "img";
                let explicitType: string | null = null;
                if (typeAttr && t.isStringLiteral(typeAttr.value)) {
                    explicitType = typeAttr.value.value;
                }
                const type = explicitType ?? (isImage ? "image" : "text");

                // Detect optional data-editable-fallback attr (overrides auto-extracted fallback)
                const fallbackAttr = openingEl.attributes.find(
                    (attr: any) =>
                        t.isJSXAttribute(attr) &&
                        t.isJSXIdentifier(attr.name) &&
                        attr.name.name === "data-editable-fallback",
                );

                // Extract fallback text
                let fallback = "";
                if (fallbackAttr && t.isStringLiteral(fallbackAttr.value)) {
                    fallback = fallbackAttr.value.value;
                } else if (isImage) {
                    const srcAttr = openingEl.attributes.find(
                        (attr: any) =>
                            t.isJSXAttribute(attr) &&
                            t.isJSXIdentifier(attr.name) &&
                            attr.name.name === "src",
                    );
                    if (srcAttr && t.isStringLiteral(srcAttr.value)) {
                        fallback = srcAttr.value.value;
                    }
                } else {
                    fallback = path.node.children
                        .filter((c: any) => t.isJSXText(c))
                        .map((c: any) => (c.value as string).replace(/\s+/g, " ").trim())
                        .filter(Boolean)
                        .join(" ");
                }

                // Build new prop list
                const newAttrs: any[] = [
                    t.jsxAttribute(t.jsxIdentifier("id"), strLit(t, fieldId)),
                    t.jsxAttribute(t.jsxIdentifier("fallback"), strLit(t, fallback)),
                    t.jsxAttribute(t.jsxIdentifier("tag"), strLit(t, tagName)),
                    t.jsxAttribute(t.jsxIdentifier("type"), strLit(t, type)),
                ];

                // Copy remaining attrs — skip data-editable, data-editable-type, src (images)
                for (const attr of openingEl.attributes) {
                    if (t.isJSXSpreadAttribute(attr)) {
                        newAttrs.push(attr);
                        continue;
                    }
                    const name: string = t.isJSXIdentifier(attr.name) ? attr.name.name : "";
                    if (name === "data-editable" || name === "data-editable-type" || name === "data-editable-fallback") continue;
                    if (isImage && name === "src") continue;
                    newAttrs.push(attr);
                }

                // Replace with self-closing <EditableNode ... />
                path.replaceWith(
                    t.jsxElement(
                        t.jsxOpeningElement(t.jsxIdentifier("EditableNode"), newAttrs, true),
                        null,
                        [],
                        true,
                    ),
                );

                state.hasEditable = true;
            },
        },
    };
}
