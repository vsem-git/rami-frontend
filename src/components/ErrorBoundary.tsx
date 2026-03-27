import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("ErrorBoundary caught:", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-dvh gap-4 text-center px-6">
                    <p className="text-lg uppercase tracking-widest">
                        Что-то пошло не так
                    </p>
                    <button
                        className="text-sm underline opacity-60"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Попробовать снова
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
