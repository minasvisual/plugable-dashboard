export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        // badge: {
        //   color: 'primary',
        //   text: 'NEW'
        // }
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Resources',
        route: '/resources',
        icon: 'cil-puzzle',
        items: [
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Resource',
      //   to: '/resource/test',
      //   icon: 'cil-pencil'
      // },
        ]
      },
      
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },

      {
        _name: 'CSidebarNavTitle',
        _children: ['Settings']
      }, 
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Users',
      //   to: '/users',
      //   icon: 'cil-drop'
      // },
      {
        _name: 'CSidebarNavItem',
        name: 'Settings',
        to: '/settings',
        icon: 'cil-drop'
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Download CoreUI',
      //   href: 'http://coreui.io/vue/',
      //   icon: { name: 'cil-cloud-download', class: 'text-white' },
      //   _class: 'bg-success text-white',
      //   target: '_blank'
      // }, 
      
      {
        _name: 'CSidebarNavTitle',
        _children: ['Theme']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Playground',
        to: '/theme/playground',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Docs',
        to: '/theme/docs',
        icon: 'cil-pencil'
      },
    ]
  }
]