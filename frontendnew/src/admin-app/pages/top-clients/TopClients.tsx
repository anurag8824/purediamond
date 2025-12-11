import React from 'react'
import moment from 'moment'
import MarqueeAnnouncement from '../_layout/elements/marqueeAnnouncement'
import '../reports.css'

const TopClients = () => {
  const [filter, setFilter] = React.useState<any>({
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  })

  const [items, setItems] = React.useState<any[]>([])

  const handleChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleSearch = (e: any) => {
    e.preventDefault()
    // TODO: replace with real API call; currently empty
    // For now keep items empty to match screenshot layout
    setItems([])
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
                <form onSubmit={handleSearch}>
                  <div className='report-filters-row'>
                    <div className='report-filter-group'>
                      <label>Start Date</label>
                      <input name='startDate' type='date' value={filter.startDate} onChange={handleChange} />
                    </div>
                    <div className='report-filter-group'>
                      <label>End Date</label>
                      <input name='endDate' type='date' value={filter.endDate} onChange={handleChange} />
                    </div>
                    <button className='report-search-btn' type='submit'>SEARCH</button>
                  </div>
                </form>
              </div>

              <h4 style={{ margin: '10px 0' }}>Top Clients Details({moment(filter.startDate).format('DD/MM/YYYY')} - {moment(filter.endDate).format('DD/MM/YYYY')})</h4>

              <div className='report-table-wrapper'>
                <table className='report-table'>
                  <thead>
                    <tr>
                      <th>USERNAME</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={2} className='report-empty'>No Result Found</td>
                      </tr>
                    ) : (
                      items.map((it, idx) => (
                        <tr key={idx}>
                          <td className='wnwrap'>{it.username}</td>
                          <td className={it.total >= 0 ? 'positive' : 'negative'}>{it.total.toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                    <tr>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>TOTAL:</td>
                      <td style={{ fontWeight: 700 }}>{totalSum.toFixed(2)}</td>
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

export default TopClients
