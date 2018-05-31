const getters = {
  tag: state => state.tags.tag,
  website: state => state.common.website,
  theme: state => state.common.theme,
  isCollapse: state => state.common.isCollapse,
  isLock: state => state.common.isLock,
  isFullScren: state => state.common.isFullScren,
  lockPasswd: state => state.common.lockPasswd,
  tagList: state => state.tags.tagList,
  tagCurrent: state => state.tags.tagCurrent,
  tagWel: state => state.tags.tagWel,
  errLog: state => state.errLog.errLog,
  menu: state => state.user.menu,
  access_token: state => state.user.token
}
export default getters
