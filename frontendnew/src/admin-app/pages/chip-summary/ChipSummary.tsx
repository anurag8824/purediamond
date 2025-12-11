import React from 'react'
import MarqueeAnnouncement from '../_layout/elements/marqueeAnnouncement'
import '../reports.css'
import './chip-summary.css'

const ChipSummary = () => {
  // Placeholder data to match screenshot
  const user = 'BTVIP1'
  const currentBalance = 2001
  const downlineCredit = 0
  const clientTotalWallet = 25
  const uplinePL = 0
  const totalClients = 25

  return (
    <>
      <MarqueeAnnouncement />
      <div style={{ paddingTop: 20 }}>
        <div className='container-fluid report-page'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card chip-card'>
                <div className='card-header chip-card-header'>
                  <h3>CHIP SMRY</h3>
                </div>
                <div className='card-body chip-card-body'>
                  <table className='chip-table'>
                    <tbody>
                      <tr><td>User : {user}</td></tr>
                      <tr><td>Current Balance : {currentBalance}</td></tr>
                      <tr><td>Down-Line Credit Remaining : {downlineCredit}</td></tr>
                      <tr><td>Client Total Wallet : {clientTotalWallet}</td></tr>
                      <tr><td>Up-line P L : {uplinePL}</td></tr>
                      <tr><td>Total Clients : {totalClients}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChipSummary
