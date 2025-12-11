import React from 'react'
import MarqueeAnnouncement from '../_layout/elements/marqueeAnnouncement'
import '../reports.css'
import './profile.css'

const Profile = () => {
  // Placeholder user data
  const user = {
    name: 'BTVIP1',
    username: 'BTVIP1',
    freeChip: 2000.9199999999983,
    pl: 0,
    expose: 0,
    cricketShare: 0,
    footballShare: 0,
    tennisShare: 0,
    horseShare: 0,
    greyhoundShare: 0,
    iCasinoShare: 0,
  }

  const [passwords, setPasswords] = React.useState({ oldPass: '', newPass: '', retype: '' })

  const handleChange = (e: any) => setPasswords({ ...passwords, [e.target.name]: e.target.value })

  const handleUpdate = (e: any) => {
    e.preventDefault()
    // TODO: call change password API
    alert('Password update requested (placeholder)')
  }

  return (
    <>
      <MarqueeAnnouncement />
      <div style={{ paddingTop: 20 }}>
        <div className='container-fluid report-page'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='profile-card'>
                <h3 className='profile-title'>User Details</h3>
                <div className='profile-list'>
                  <div className='profile-row'><i className='fa fa-smile-o icon'/> <span>Name : {user.name}</span></div>
                  <div className='profile-row'><i className='fa fa-user icon'/> <span>Username : {user.username}</span></div>
                  <div className='profile-row'><i className='fa fa-credit-card icon'/> <span>Free Chip : {user.freeChip}</span></div>
                  <div className='profile-row'><i className='fa fa-dollar icon'/> <span>P/L : {user.pl.toFixed(2)}</span></div>
                  <div className='profile-row'><i className='fa fa-line-chart icon'/> <span>Expose : {user.expose.toFixed(2)}</span></div>
                  <div className='profile-row'><i className='fa fa-users icon'/> <span>Cricket Client Share : {user.cricketShare.toFixed(2)}</span></div>
                  <div className='profile-row'><i className='fa fa-users icon'/> <span>Football Client Share : {user.footballShare.toFixed(2)}</span></div>
                  <div className='profile-row'><i className='fa fa-users icon'/> <span>Tennis Client Share : {user.tennisShare.toFixed(2)}</span></div>
                  <div className='profile-row'><i className='fa fa-users icon'/> <span>Horse Client Share : {user.horseShare.toFixed(2)}</span></div>
                  <div className='profile-row'><i className='fa fa-users icon'/> <span>Greyhound Client Share : {user.greyhoundShare.toFixed(2)}</span></div>
                  <div className='profile-row'><i className='fa fa-users icon'/> <span>iCasino Client Share : {user.iCasinoShare.toFixed(2)}</span></div>
                </div>
              </div>

              <div className='profile-card change-password-card'>
                <h3 className='profile-title'>CHANGE PASSWORD</h3>
                <form className='change-password-form' onSubmit={handleUpdate}>
                  <div className='form-row'>
                    <label>Old Password</label>
                    <input name='oldPass' type='password' placeholder='Old Password' value={passwords.oldPass} onChange={handleChange} />
                  </div>
                  <div className='form-row'>
                    <label>New Password</label>
                    <input name='newPass' type='password' placeholder='New Password' value={passwords.newPass} onChange={handleChange} />
                  </div>
                  <div className='form-row'>
                    <label>Re-Type Password</label>
                    <input name='retype' type='password' placeholder='Re-Type Password' value={passwords.retype} onChange={handleChange} />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <button className='update-btn' type='submit'>UPDATE</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
