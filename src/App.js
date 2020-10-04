import React, { useEffect, useState} from 'react';
import Table from './components/Table';
import { HextoRGB, RGBToCMYK } from './utils'
import './App.css'

export default function App() {
  const [data, setData] = useState([])
  const [showData, setShowData] = useState([])
  useEffect(() => {
    (async () => {
      let { colors } = await import('./data/xkcd.json')
      colors.forEach(obj => {
        obj.rgb = HextoRGB(obj.hex).join(', ')
        obj.hex = obj.hex.toUpperCase()
        obj.cmyk = RGBToCMYK(obj.rgb).join(', ')
        obj.backgroundElement = <td style={{ backgroundColor: obj.hex }}></td>
      })
      setData(colors)
      setShowData(colors.length > 50 ? colors.slice(0, 50) : colors)
    })();
    return () => {
      setData(null)
      setShowData(null)
    }
  }, [])
  const searchKeyDownEvent = (e) => {
    if (e.keyCode !== 13) {
      return
    }
    let val = e.target.value.trim()
    let [r, g, b] = []
    if (/^(#[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val)) {
      [r, g, b] = HextoRGB(RegExp.$1)
    }
    if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i.test(val)) {
      [r, g, b] = [RegExp.$1, RegExp.$2, RegExp.$3]
    }
    if (!r) {
      return
    }
    let results = []
    data.forEach((obj) => {
      let [r2, g2, b2] = obj.rgb.split(', ')
      if (Math.abs(r - r2) < 255 * (0.28) &&
        Math.abs(g - g2) < 255 * (0.28) &&
        Math.abs(b - b2) < 255 * (0.28)) {
        results.push({
          ...obj,
          similarity: Math.sqrt((r - r2) * (r - r2) + (g - g2) * (g - g2) + (b - b2) * (b - b2))
        })
        return true
      }
    });
    results.sort((a, b) => a.similarity - b.similarity)
    setShowData(results.length > 50 ? results.slice(0, 50) : results)
  }
  return (
    <div>
      <h1>Colors</h1>
      <input type="search" className="search-input" onKeyDown={searchKeyDownEvent} />
      <Table
        className="color-table"
        columns={[
          { prop: 'backgroundElement' },
          { label: 'Name', prop: 'color' },
          { label: 'Hex', prop: 'hex' },
          { label: 'RGB', prop: 'rgb' },
          { label: 'CMYK', prop: 'cmyk' },
        ]}
        data={showData}
      ></Table>
    </div>
  )
} 
