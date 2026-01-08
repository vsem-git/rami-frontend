const Envelope = ({
    headerColor,
    ...props
}: React.SVGProps<SVGSVGElement> & { headerColor: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 48 48"
            id="Layer_2"
            data-name="Layer 2"
            {...props}
        >
            {headerColor && (
                <defs>
                    <style>{`.cls-1{fill:none;stroke:${headerColor};stroke-linecap:round;stroke-linejoin:round;`}</style>
                </defs>
            )}
            <path
                className="cls-1"
                d="M6.47,10.71a2,2,0,0,0-2,2h0V35.32a2,2,0,0,0,2,2H41.53a2,2,0,0,0,2-2h0V12.68a2,2,0,0,0-2-2H6.47Zm33.21,3.82L24,26.07,8.32,14.53"
            />
        </svg>
    );
};

export default Envelope;
