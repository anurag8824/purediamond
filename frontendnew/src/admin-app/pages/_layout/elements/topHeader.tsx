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
          <nav className='header-nav'>
            <ul className='nav-menu'>
              <li>
                <CustomLink to='/home'>Home</CustomLink>
              </li>
              <li>
                <CustomLink to='/combined-dashboard'>Dashboard</CustomLink>
              </li>
              <li>
                <CustomLink to={`/list-clients/${userState?.user?.username}`}>List of Clients</CustomLink>
              </li>
              <li>
                <CustomLink to={`/add-user/${userState?.user?.username}`}>Create Client</CustomLink>
              </li>
              <li>
                <CustomLink to='/market-analysis'>Market Analysis</CustomLink>
              </li>

              {/* Profile dropdown with Reports, Transactions, Settings, and Live Casino moved inside */}
              <li className='dropdown profile-dropdown'>
                <button onClick={() => {
                  setShowMenu(!showMenu)
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
                  <ul className='dropdown-menu dropdown-menu-right'>
                    <li>
                      <CustomLink to='/change-password'>
                        <i className='fas fa-key'></i> Change Password
                      </CustomLink>
                    </li>
                    
                    <li className='dropdown-divider'></li>
                    
                    {/* Reports Collapsible Section */}
                    <li className='dropdown-submenu'>
                      <button 
                        className='dropdown-submenu-btn'
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowReportsInProfile(!showReportsInProfile)
                        }}
                      >
                        <i className='fas fa-chart-bar'></i> REPORTS 
                        <i className={`fas fa-chevron-${showReportsInProfile ? 'up' : 'down'} submenu-arrow`}></i>
                      </button>
                    </li>
                    {showReportsInProfile && (
                      <>
                        <li className='submenu-item'><CustomLink to='/accountstatement'>Account Statement</CustomLink></li>
                        <li className='submenu-item'><CustomLink to='/unsettledbet'>Current Bets</CustomLink></li>
                        {userState?.user?.role === RoleType.admin && (
                          <li className='submenu-item'><CustomLink to='/unsettledbet/deleted'>Deleted Bets</CustomLink></li>
                        )}
                        <li className='submenu-item'><CustomLink to='/game-reports'>Game Reports</CustomLink></li>
                        <li className='submenu-item'><CustomLink to='/profitloss'>Profit And Loss</CustomLink></li>
                      </>
                    )}
                    
                    <li className='dropdown-divider'></li>
                    
                    {/* Transactions Collapsible Section */}
                    <li className='dropdown-submenu'>
                      <button 
                        className='dropdown-submenu-btn'
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowTransactionsInProfile(!showTransactionsInProfile)
                        }}
                      >
                        <i className='fas fa-exchange-alt'></i> TRANSACTIONS 
                        <i className={`fas fa-chevron-${showTransactionsInProfile ? 'up' : 'down'} submenu-arrow`}></i>
                      </button>
                    </li>
                    {showTransactionsInProfile && (
                      <>
                        <li className='submenu-item'><CustomLink to='/depositstatement'>Deposit</CustomLink></li>
                        <li className='submenu-item'><CustomLink to='/withdrawstatement'>Withdraw</CustomLink></li>
                      </>
                    )}
                    
                    <li className='dropdown-divider'></li>
                    
                    {/* Live Casino Collapsible Section */}
                    <li className='dropdown-submenu'>
                      <button 
                        className='dropdown-submenu-btn'
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowCasinoInProfile(!showCasinoInProfile)
                        }}
                      >
                        <i className='fas fa-dice'></i> LIVE CASINO 
                        <i className={`fas fa-chevron-${showCasinoInProfile ? 'up' : 'down'} submenu-arrow`}></i>
                      </button>
                    </li>
                    {showCasinoInProfile && gameList?.length > 0 &&
                      gameList.map((Item: any, key: number) => (
                        <li key={key} className='submenu-item'>
                          <CustomLink to={`/casino/${Item.slug}`}>{Item.title}</CustomLink>
                        </li>
                      ))}
                    
                    <li className='dropdown-divider'></li>
                    
                    {/* Settings Collapsible Section */}
                    <li className='dropdown-submenu'>
                      <button 
                        className='dropdown-submenu-btn'
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowSettingsInProfile(!showSettingsInProfile)
                        }}
                      >
                        <i className='fas fa-cog'></i> SETTINGS 
                        <i className={`fas fa-chevron-${showSettingsInProfile ? 'up' : 'down'} submenu-arrow`}></i>
                      </button>
                    </li>
                    {showSettingsInProfile && (
                      <>
                        {(userState?.user?.role === RoleType.admin) && (
                          <>
                            <li className='submenu-item'><CustomLink to='/sports-list/active-matches'>Block Markets</CustomLink></li>
                            <li className='submenu-item'><CustomLink to='/messages'>Messages</CustomLink></li>
                            <li className='submenu-item'><CustomLink to='/sports-list/matches'>Add Match List</CustomLink></li>
                            <li className='submenu-item'><CustomLink to='/casino-list'>Casino List</CustomLink></li>
                          </>
                        )}
                        <li className='submenu-item'><CustomLink to='/payment-method'>Payment Method</CustomLink></li>
                        <li className='submenu-item'><CustomLink to='/update-whatsapp'>Update Whatsapp</CustomLink></li>
                      </>
                    )}
                    
                    <li className='dropdown-divider'></li>
                    <li>
                      <a onClick={logoutUser} href='#'>
                        <i className='fas fa-sign-out-alt'></i> Logout
                      </a>
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
