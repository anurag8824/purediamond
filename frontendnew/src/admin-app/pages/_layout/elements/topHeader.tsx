import React from 'react'
import { AxiosResponse } from 'axios'
import User, { RoleType } from '../../../../models/User'
import { CustomLink, useNavigateCustom } from '../../../../pages/_layout/elements/custom-link'
import { logout, selectUserData, userUpdate } from '../../../../redux/actions/login/loginSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
// Removed search autocomplete and userService as search is no longer in header
// import CustomAutoComplete from '../../../components/CustomAutoComplete'
// import userService from '../../../../services/user.service'
import casinoService from '../../../../services/casino.service'

interface TopHeaderProps {
  onMenuToggle?: () => void
}

const TopHeader = ({ onMenuToggle }: TopHeaderProps) => {
  const userState = useAppSelector<{ user: User }>(selectUserData)
  const dispatch = useAppDispatch()
  const navigate = useNavigateCustom()
  
  const [showMenu, setShowMenu] = React.useState<boolean>(false)
  const [showMarketDropdown, setShowMarketDropdown] = React.useState<boolean>(false)
  const [showClientListDropdown, setShowClientListDropdown] = React.useState<boolean>(false)
  const [showReportsInProfile, setShowReportsInProfile] = React.useState<boolean>(false)
  const [showTransactionsInProfile, setShowTransactionsInProfile] = React.useState<boolean>(false)
  const [showCasinoInProfile, setShowCasinoInProfile] = React.useState<boolean>(false)
  const [showSettingsInProfile, setShowSettingsInProfile] = React.useState<boolean>(false)
  const [gameList, setGameList] = React.useState([])

  React.useEffect(() => {
    casinoService.getCasinoList().then((res: AxiosResponse<any>) => {
      setGameList(res.data.data)
    })
  }, [])

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown') && !target.closest('.user-menu')) {
        setShowMarketDropdown(false)
        setShowClientListDropdown(false)
        setShowMenu(false)
        setShowReportsInProfile(false)
        setShowTransactionsInProfile(false)
        setShowCasinoInProfile(false)
        setShowSettingsInProfile(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const logoutUser = (e: any) => {
    e.preventDefault()
    dispatch(userUpdate({} as User))
    setTimeout(() => {
      dispatch(logout())
      navigate.go('/login')
    }, 1)
  }

  // Search removed from header

  return (
    <div className='admin-top-header'>
      <div className='top-header-content'>
        <div className='header-left'>
          <CustomLink to={'/'} className='header-logo'>
            <img src='/imgs/logo.png' alt='Logo' />
          </CustomLink>
        </div>

        <div className='header-right'>
          {/* Balance and Upline Info Box */}
          <div className='balance-upline-box'>
            <div className='balance-info'>
              <span className='label'>Bal :</span>
              <span className='value'>2001</span>
            </div>
            <div className='upline-info'>
              <span className='label'>Upline :</span>
              <span className='value'>0</span>
            </div>
          </div>

          <nav className='header-nav'>
            <ul className='nav-menu'>
              {/* Market Dropdown */}
              <li className='dropdown'>
                <button onClick={(e) => {
                  e.stopPropagation()
                  setShowMarketDropdown(!showMarketDropdown)
                  setShowClientListDropdown(false)
                  setShowMenu(false)
                }}>
                  Market <i className='fas fa-caret-down'></i>
                </button>
                {showMarketDropdown && (
                <ul className='dropdown-menu profile-menu'>
                  <li>
                    <CustomLink to='/market-analysis'>Market Analysis</CustomLink>
                  </li>
                  <li>
                    <CustomLink to='/multi-market'>Multi Market</CustomLink>
                  </li>
                  <li>
                    <CustomLink to='/unsettledbet'>Unsettled Bets</CustomLink>
                  </li>
                  <li>
                    <CustomLink to='/casino-history'>Int Casino History</CustomLink>
                  </li>
                </ul>
                )}
              </li>

              {/* Client List Dropdown */}
              <li className='dropdown'>
                <button onClick={(e) => {
                  e.stopPropagation()
                  setShowClientListDropdown(!showClientListDropdown)
                  setShowMarketDropdown(false)
                  setShowMenu(false)
                }}>
                  Client List <i className='fas fa-caret-down'></i>
                </button>
                {showClientListDropdown && (
                <ul className='dropdown-menu profile-menu'>
                  <li>
                    <CustomLink to={`/list-clients/${userState?.user?.username}`}>List of Clients</CustomLink>
                  </li>
                  <li>
                    <CustomLink to='/blocked-clients'>Blocked Clients</CustomLink>
                  </li>
                </ul>
                )}
              </li>

              {/* Create Client Button */}
              <li>
                <CustomLink to={`/add-user/${userState?.user?.username}`}>Create Client</CustomLink>
              </li>

              {/* Profile dropdown with Home, Dashboard, Reports, Transactions, Settings, and Live Casino moved inside */}
              <li className='dropdown profile-dropdown'>
                <button onClick={(e) => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                  setShowMarketDropdown(false)
                  setShowClientListDropdown(false)
                  if (!showMenu) {
                    setShowReportsInProfile(false)
                    setShowTransactionsInProfile(false)
                    setShowCasinoInProfile(false)
                    setShowSettingsInProfile(false)
                  }
                }}>
                  {userState?.user?.username} <i className='fas fa-caret-down'></i>
                </button>
                {showMenu && (
                  <ul className='dropdown-menu dropdown-menu-right profile-menu'>
                    {/* Requested items only (others commented out for now) */}
                    <li><CustomLink to='/profitloss'>Profit Loss</CustomLink></li>
                    <li><CustomLink to='/accountstatement'>A/C Statement</CustomLink></li>
                    <li><CustomLink to='/accountstatement-old'>Old A/C Statement</CustomLink></li>
                    <li><CustomLink to='/top-clients'>Top Clients</CustomLink></li>
                    <li><CustomLink to='/top-clients-new'>Top Clients New</CustomLink></li>
                    <li><CustomLink to='/sport-report'>Sport Report</CustomLink></li>
                    <li><CustomLink to='/sport-report-new'>Sport Report New</CustomLink></li>
                    <li><CustomLink to='/weekly-report'>Weekly Report</CustomLink></li>
                    <li><CustomLink to='/settlement-report'>Settlement Report</CustomLink></li>
                    <li><CustomLink to='/chip-summary'>Chip Smry</CustomLink></li>
                    <li><CustomLink to='/balance-sheet'>Balance Sheet</CustomLink></li>
                    <li><CustomLink to='/export'>Export</CustomLink></li>
                    <li><CustomLink to='/profile'>Profile</CustomLink></li>
                    <li><CustomLink to='/change-password'>Change Password</CustomLink></li>

                    {/*
                    The following items are commented out for now per request:
                    <li className='dropdown-divider'></li>
                    <li><CustomLink to='/unsettledbet'>Current Bets</CustomLink></li>
                    {userState?.user?.role === RoleType.admin && (
                      <li><CustomLink to='/unsettledbet/deleted'>Deleted Bets</CustomLink></li>
                    )}
                    <li><CustomLink to='/game-reports'>Game Reports</CustomLink></li>
                    {(userState?.user?.role === RoleType.admin) && (
                      <>
                        <li><CustomLink to='/sports-list/active-matches'>Block Markets</CustomLink></li>
                        <li><CustomLink to='/messages'>Messages</CustomLink></li>
                        <li><CustomLink to='/sports-list/matches'>Add Match List</CustomLink></li>
                        <li><CustomLink to='/casino-list'>Casino List</CustomLink></li>
                      </>
                    )}
                    <li><CustomLink to='/payment-method'>Payment Method</CustomLink></li>
                    <li><CustomLink to='/update-whatsapp'>Update Whatsapp</CustomLink></li>
                    <li><CustomLink to='/depositstatement'>Deposit</CustomLink></li>
                    <li><CustomLink to='/withdrawstatement'>Withdraw</CustomLink></li>
                    */}

                    {/* Visible logout button (restored as requested) */}
                    <li className='logout-item'>
                      <a onClick={logoutUser} href='#'>LOGOUT</a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
