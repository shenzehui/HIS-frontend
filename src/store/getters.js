const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  roleId: state => state.user.roleId,
  id: state => state.user.id,
  deptId: state => state.user.deptId,
  staffs: state => state.chat.staffs,
  currentSession: state => state.chat.currentSession,
  isDot: state => state.chat.isDot,
  sessions: state => state.chat.sessions,
  stomp: state => state.chat.stomp

}
export default getters
