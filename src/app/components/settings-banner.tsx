import { Dispatch, SetStateAction } from "react";
import { comboBoxValues } from "../helpers/coordination";
import { settingsBannerStyle, headingStyle, labelStyle, selectStyle, comboBoxGridStyle } from "./styles";

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
            <h1 style={headingStyle}>Settings</h1>

            <div style={comboBoxGridStyle}>
                <label style={labelStyle} htmlFor="gridCount">Grid Count:</label>
                <select style={selectStyle} id="gridCount" name="gridCount" defaultValue={defaultGridCount} onChange={(e) => setGridCount(Number(e.target.value))}>
                    {(gridCount ?? []).map((value: number) => (
                        <option key={value} value={value}>{value}x{value}</option>
                    ))}
                </select>
            </div>

            <div style={comboBoxGridStyle}>
                <label style={labelStyle} htmlFor="shipLength">Ship Length:</label>
                <select style={selectStyle} id="shipLength" name="shipLength" defaultValue={defaultShipLength} onChange={(e) => setShipLength(Number(e.target.value))}>
                    {(shipLength ?? []).map((value: number) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </div>

        </div>
    );
}