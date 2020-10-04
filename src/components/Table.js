import React from 'react'

export default function Table(props) {
    let attr = []
    return (
        <table className={props.className}>
            <thead>
                <tr>
                    {props.columns.map((item, index) => {
                        attr.push(item.prop)
                        return <th key={index}>{item.label}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.map((data, index) => {
                    return (
                        <tr key={index}>
                            {attr.map((item, index2) => {
                                if (React.isValidElement(data[item])) {
                                    return React.cloneElement(data[item],{
                                        key: index2
                                    })
                                }
                                return <td key={index2}>{data[item]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
