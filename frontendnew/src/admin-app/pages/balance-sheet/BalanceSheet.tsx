import React from 'react'
import MarqueeAnnouncement from '../_layout/elements/marqueeAnnouncement'
import '../reports.css'
import './balance-sheet.css'
import UserService from '../../../services/user.service'

const calcTotal = (arr: any[]) => arr.reduce((s, i) => s + parseFloat(String(i.chip || 0)), 0)

const BalanceSheet = () => {
  const [leftData, setLeftData] = React.useState<any[]>([])
  const [rightData, setRightData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        // Try to fetch full user list from backend; fallback to empty arrays
        const res: any = await UserService.getUserList({ status: '', page: 1 })
        // API returns paged data; try to extract array
        const users = res?.data?.data || res?.data || []

        // Map API users to display rows (use balance fields if present)
        const mapped = users.map((u: any) => ({
          ut: u.type && u.type.toUpperCase() === 'CLIENT' ? 'C' : 'C',
          username: `${u.username} [${u.username} ]`,
          chip: (u.balance && Number(u.balance).toFixed(2)) || (u.mainBalance && Number(u.mainBalance).toFixed(2)) || '0',
        }))

        // Split first few to left, rest to right to mimic screenshot
        setLeftData(mapped.slice(0, 4))
        setRightData(mapped.slice(4))
      } catch (err: any) {
        setError(err?.message || 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const leftTotal = calcTotal(leftData)
  const rightTotal = calcTotal(rightData)

  return (
    <>
      <MarqueeAnnouncement />
      <div style={{ paddingTop: 20 }}>
        <div className='container'>
          {loading && <div>Loading...</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div className='balance-container'>
            <div className='left-panel'>
              <table className='summary-table'>
                <thead>
                  <tr>
                    <th className='ut-col'>UT</th>
                    <th>Username</th>
                    <th style={{ textAlign: 'right' }}>Chip</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leftData.map((r, idx) => (
                    <tr key={idx}>
                      <td className='ut-col'>{r.ut}</td>
                      <td style={{ fontWeight: 700 }}>{r.username}</td>
                      <td style={{ textAlign: 'right', color: '#059669', fontWeight: 700 }}>{r.chip}</td>
                      <td>
                        <button className='history-btn'>HISTORY</button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td>#</td>
                    <td style={{ fontWeight: 700 }}>Up-Line P/L</td>
                    <td style={{ textAlign: 'right', color: '#059669', fontWeight: 700 }}>16384.92</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>#</td>
                    <td style={{ fontWeight: 700 }}>My Commission</td>
                    <td style={{ textAlign: 'right', color: '#059669', fontWeight: 700 }}>0</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>#</td>
                    <td style={{ fontWeight: 700 }}>My P/L</td>
                    <td style={{ textAlign: 'right', color: '#059669', fontWeight: 700 }}>16384.92</td>
                    <td>-</td>
                  </tr>

                  <tr className='total-row'>
                    <td colSpan={2} style={{ textAlign: 'left', paddingLeft: 16, fontWeight: 800 }}>TOTAL</td>
                    <td style={{ textAlign: 'right', fontWeight: 800 }}>{leftTotal.toFixed(2)}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='right-panel'>
              <table className='list-table'>
                <thead>
                  <tr>
                    <th className='ut-col'>UT</th>
                    <th>Username</th>
                    <th style={{ textAlign: 'right' }}>Chip</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rightData.map((r, idx) => (
                    <tr key={idx}>
                      <td className='ut-col'>{r.ut}</td>
                      <td style={{ fontWeight: 700 }}>{r.username}</td>
                      <td style={{ textAlign: 'right', color: '#b91c1c', fontWeight: 700 }}>{r.chip}</td>
                      <td>
                        <button className='history-btn'>HISTORY</button>
                      </td>
                    </tr>
                  ))}

                  <tr className='total-row'>
                    <td colSpan={2} style={{ textAlign: 'left', paddingLeft: 16, fontWeight: 800 }}>TOTAL</td>
                    <td style={{ textAlign: 'right', fontWeight: 800 }}>{rightTotal.toFixed(2)}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BalanceSheet
