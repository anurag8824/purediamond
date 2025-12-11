import React from 'react'
import moment from 'moment'
import MarqueeAnnouncement from '../_layout/elements/marqueeAnnouncement'
import '../reports.css'

const getDateRange = (start: string, end: string) => {
  const startM = moment(start)
  const endM = moment(end)
  const days: string[] = []
  const cursor = startM.clone()
  while (cursor.isSameOrBefore(endM)) {
    days.push(cursor.format('D-M-YYYY'))
    cursor.add(1, 'day')
  }
  return days
}

const WeeklyReport = () => {
  const [filter, setFilter] = React.useState<any>({
    startDate: moment().subtract(6, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  })

  const [rows, setRows] = React.useState<any[]>([]) // placeholder for weekly rows
  const [casinoRows, setCasinoRows] = React.useState<any[]>([])

  React.useEffect(() => {
    // initialize empty rows to match screenshot: only totals shown as zeros
    setRows([{ label: 'Total', values: [] }])
    setCasinoRows([{ label: 'Total', values: [] }])
  }, [])

  const handleChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handleSearch = (e: any) => {
    e.preventDefault()
    // TODO: call API to populate rows/casinoRows
    // For now keep zeros to match screenshot
    const dates = getDateRange(filter.startDate, filter.endDate)
    setRows([{ label: 'Total', values: Array(dates.length).fill(0) }])
    setCasinoRows([{ label: 'Total', values: Array(dates.length).fill(0) }])
  }

  const handleLifetime = (e: any) => {
    e.preventDefault()
    // TODO: implement lifetime search
    handleSearch(e)
  }

  const dates = getDateRange(filter.startDate, filter.endDate)

  const renderTable = (title: string, data: any[]) => {
    const totalPerRow = (values: number[]) => values.reduce((a, b) => a + b, 0)
    return (
      <>
        <h4 style={{ margin: '10px 0' }}>{title}({moment(filter.startDate).format('DD/MM/YYYY')} - {moment(filter.endDate).format('DD/MM/YYYY')})</h4>
        <div className='report-table-wrapper'>
          <table className='report-table' style={{ minWidth: Math.max(600, 120 * (dates.length + 1)) }}>
            <thead>
              <tr>
                <th> </th>
                {dates.map((d, i) => (
                  <th key={i}>{d}</th>
                ))}
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={dates.length + 2} className='report-empty'>No Result Found</td>
                </tr>
              ) : (
                data.map((r: any, idx: number) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'left', paddingLeft: 20 }}>{r.label}</td>
                    {r.values && r.values.length > 0 ? r.values.map((v: number, j: number) => (
                      <td key={j} style={{ textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>{v}</td>
                    )) : dates.map((_, j) => (
                      <td key={j} style={{ textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>0</td>
                    ))}
                    <td style={{ textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>{r.values && r.values.length > 0 ? totalPerRow(r.values) : 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </>
    )
  }

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

              {renderTable('Weekly Report', rows)}
              <div style={{ height: 18 }} />
              {renderTable('Casino Details', casinoRows)}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeeklyReport
