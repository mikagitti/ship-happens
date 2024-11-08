import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { settingsBannerStyle, HeadingStyle, labelStyle, selectStyle, comboBoxGridStyle } from "./settings-banner-styles";

import { comboBoxValues } from "../helpers/coordination";

type settingsBannerProps = {
    setGridCount: Dispatch<SetStateAction<number>>;
    setShipLength: Dispatch<SetStateAction<number>>;
}

export default function SettingsBanner({ setGridCount, setShipLength }: settingsBannerProps) {
    const gridCount: number[] = comboBoxValues.gridCount;
    const shipLength: number[] = comboBoxValues.shipLength;
    const defaultGridCount: number = comboBoxValues.defaultGridCount;
    const defaultShipLength: number = comboBoxValues.defaultShipLength;

    return (
        <div style={settingsBannerStyle}>
            <HeadingStyle>Settings</HeadingStyle>

            <CompoboxComponent info={'Sea grid size'} values={gridCount} defaultValue={defaultGridCount} onChange={setGridCount} squareText={true} />
            <CompoboxComponent info={'Ship length'} values={shipLength} defaultValue={defaultShipLength} onChange={setShipLength} />

        </div>
    );
}


type ComboBoxComponentProps = {
    info: string;
    values: number[];
    defaultValue: number;
    onChange: Dispatch<SetStateAction<number>>;
    squareText?: boolean;
};

const CompoboxComponent = ({ info, values, defaultValue, onChange, squareText = false }: ComboBoxComponentProps) => {

    const [count, setCount] = useState<number>(defaultValue);

    useEffect(() => {
        onChange(count);
    }, [count]);

    return (
        <div style={comboBoxGridStyle}>
            <label style={labelStyle}>{info}:</label>
            <select style={selectStyle} defaultValue={defaultValue} onChange={(e) => setCount(Number(e.target.value))}>
                {(values ?? []).map((value: number) => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <label style={labelStyle}>{squareText ? `${count}x${count}` : 'grids'} </label>
        </div>
    );
}
