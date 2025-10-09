const Clocks = ({
    minuteAngle,
    hourAngle,
    ...props
}: {
    minuteAngle: number;
    hourAngle: number;
} & React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="1080"
            height="1080"
            viewBox="0 0 1080 1080"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g filter="url(#filter0_f_573_28292)">
                <path
                    d="M550 1000H530V900H550V1000ZM550 180H530V80H550V180Z"
                    fill="#1D1D1D"
                    fill-opacity="0.6"
                />
            </g>
            <g filter="url(#filter1_f_573_28292)">
                <path
                    d="M778.66 933.372L761.34 943.372L711.34 856.77L728.66 846.77L778.66 933.372ZM368.66 223.231L351.34 233.231L301.34 146.629L318.66 136.629L368.66 223.231Z"
                    fill="#1D1D1D"
                    fill-opacity="0.6"
                />
            </g>
            <g filter="url(#filter2_f_573_28292)">
                <path
                    d="M943.368 761.34L933.368 778.66L846.766 728.66L856.766 711.34L943.368 761.34ZM233.228 351.34L223.228 368.66L136.625 318.66L146.625 301.34L233.228 351.34Z"
                    fill="#1D1D1D"
                    fill-opacity="0.6"
                />
            </g>
            <g filter="url(#filter3_f_573_28292)">
                <path
                    d="M1000 530L1000 550L900 550L900 530L1000 530ZM180 530L180 550L80 550L80 530L180 530Z"
                    fill="#1D1D1D"
                    fill-opacity="0.6"
                />
            </g>
            <g filter="url(#filter4_f_573_28292)">
                <path
                    d="M146.628 778.66L136.628 761.34L223.23 711.34L233.23 728.66L146.628 778.66ZM856.769 368.66L846.769 351.34L933.371 301.34L943.371 318.66L856.769 368.66Z"
                    fill="#1D1D1D"
                    fill-opacity="0.6"
                />
            </g>
            <g filter="url(#filter5_f_573_28292)">
                <path
                    d="M761.336 136.628L778.656 146.628L728.656 233.23L711.336 223.23L761.336 136.628ZM351.336 846.769L368.656 856.769L318.656 943.371L301.336 933.371L351.336 846.769Z"
                    fill="#1D1D1D"
                    fill-opacity="0.6"
                />
            </g>
            <g
                filter="url(#filter6_f_573_28292)"
                id="bigarrow"
                transform={`rotate(${minuteAngle} 540 540)`}
            >
                <path
                    d="M540 590C512.386 590 490 567.614 490 540C490 512.386 512.386 490 540 490C567.614 490 860 540 860 540C860 540 567.614 590 540 590Z"
                    fill="#1D1D1D"
                    fillOpacity="0.6"
                />
            </g>
            <g
                filter="url(#filter7_f_573_28292)"
                id="smallarrow"
                transform={`rotate(${hourAngle} 540 540)`}
            >
                <path
                    d="M588.296 552.94C581.148 579.614 553.732 595.443 527.058 588.296C500.385 581.149 484.556 553.732 491.703 527.058C498.85 500.385 592.281 344.882 592.281 344.882C592.281 344.882 595.443 526.267 588.296 552.94Z"
                    fill="#1D1D1D"
                    fillOpacity="0.6"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_573_28292"
                    x="500"
                    y="50"
                    width="80"
                    height="980"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="15"
                        result="effect1_foregroundBlur_573_28292"
                    />
                </filter>
                <filter
                    id="filter1_f_573_28292"
                    x="271.34"
                    y="106.629"
                    width="537.32"
                    height="866.742"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="15"
                        result="effect1_foregroundBlur_573_28292"
                    />
                </filter>
                <filter
                    id="filter2_f_573_28292"
                    x="106.625"
                    y="271.34"
                    width="866.742"
                    height="537.32"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="15"
                        result="effect1_foregroundBlur_573_28292"
                    />
                </filter>
                <filter
                    id="filter3_f_573_28292"
                    x="50"
                    y="500"
                    width="980"
                    height="80"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="15"
                        result="effect1_foregroundBlur_573_28292"
                    />
                </filter>
                <filter
                    id="filter4_f_573_28292"
                    x="106.629"
                    y="271.34"
                    width="866.742"
                    height="537.32"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="15"
                        result="effect1_foregroundBlur_573_28292"
                    />
                </filter>
                <filter
                    id="filter5_f_573_28292"
                    x="271.336"
                    y="106.627"
                    width="537.32"
                    height="866.744"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="15"
                        result="effect1_foregroundBlur_573_28292"
                    />
                </filter>
                <filter
                    id="filter6_f_573_28292"
                    x="190"
                    y="190"
                    width="700"
                    height="700"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="15"
                        result="effect1_foregroundBlur_573_28292"
                    />
                </filter>
                <filter
                    id="filter7_f_573_28292"
                    x="262.602"
                    y="262.602"
                    width="554.797"
                    height="554.797"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="15"
                        result="effect1_foregroundBlur_573_28292"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default Clocks;
