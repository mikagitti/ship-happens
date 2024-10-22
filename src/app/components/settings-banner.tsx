import { Dispatch, SetStateAction } from "react";

type settingsBannerProps = {
    setGridCount: Dispatch<SetStateAction<number>>;
    setShipLength: Dispatch<SetStateAction<number>>;
    comboBoxValues?: {
        gridCount: number[];
        shipLength: number[];
    }
}

export default function SettingsBanner({ setGridCount, setShipLength, comboBoxValues }: settingsBannerProps) {
    return (
        <div style={
            {
                alignItems: 'center',
                display: 'inline-flex',
                gap: '1rem',
                padding: '1rem',
            }
        }>
            <h1>Settings</h1>
            <div>
                <label htmlFor="gridCount">Grid Count:</label>
                <select id="gridCount" name="gridCount" onChange={(e) => setGridCount(Number(e.target.value))}>

                    {
                        (comboBoxValues?.gridCount ?? []).map((value: number) => (
                            <option key={value} value={value}>{value}x{value}</option>
                        )
                        )
                    }

                </select>
            </div>
            <div>
                <label htmlFor="shipLength">Ship Length:</label>
                <select id="shipLength" name="shipLength" defaultValue="1" onChange={(e) => setShipLength(Number(e.target.value))}>
                    {
                        (comboBoxValues?.shipLength ?? []).map((value: number) => (
                            <option key={value} value={value}>{value}</option>
                        )
                        )
                    }
                </select>
            </div>
        </div>
    );
}