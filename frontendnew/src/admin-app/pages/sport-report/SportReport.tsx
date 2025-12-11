import React from 'react'
import moment from 'moment'
import MarqueeAnnouncement from '../_layout/elements/marqueeAnnouncement'
import '../reports.css'

const SportReport = () => {
  const [filter, setFilter] = React.useState<any>({
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  })

  const [items, setItems] = React.useState<any[]>([
    { name: 'Casino 1', total: 0 },
    { name: 'Casino 2', total: 0 },
  ])

  const handleChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleSearch = (e: any) => {
    e.preventDefault()
    // TODO: call backend API to populate items
    // For now keep zeros like the screenshot
    setItems((prev) => prev.map((it) => ({ ...it, total: 0 })))
  }

  const handleLifetime = (e: any) => {
    e.preventDefault()
    // TODO: lifetime behavior - show aggregated totals
    // For now show same zeros
    setItems((prev) => prev.map((it) => ({ ...it, total: 0 })))
  }

  const totalSum = items.reduce((acc: number, it: any) => acc + (it.total || 0), 0)

  return (
    <>
      <MarqueeAnnouncement />
      <div style={{ paddingTop: '20px' }}>
        <div className='container-fluid report-page'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='report-filters'>
                <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1, display: 'flex', gap: 16 }}>
                    <div className='report-filter-group'>
                      <label>Start Date</label>
                      <input name='startDate' type='date' value={filter.startDate} onChange={handleChange} />
                    </div>
                    <div className='report-filter-group'>
                      <label>End Date</label>
                      <input name='endDate' type='date' value={filter.endDate} onChange={handleChange} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className='report-search-btn' type='submit'>SEARCH</button>
                    <button className='report-search-btn' onClick={handleLifetime}>LIFETIME SEARCH</button>
                  </div>
                </form>
              </div>

              <h4 style={{ margin: '10px 0' }}>Sports Details({moment(filter.startDate).format('DD/MM/YYYY')} - {moment(filter.endDate).format('DD/MM/YYYY')})</h4>

              <div className='report-table-wrapper'>
                <table className='report-table' style={{ minWidth: '400px' }}>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: 'left', paddingLeft: 20 }}>{it.name}</td>
                        <td style={{ textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>{it.total}</td>
                      </tr>
                    ))}
                    <tr>
                      <td style={{ textAlign: 'left', paddingLeft: 20, fontWeight: 700 }}>Total</td>
                      <td style={{ textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>{totalSum}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SportReport
