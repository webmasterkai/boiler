function createNavLink(id, args = {}) {
  const {text, to, authenticated, rest} = args;
  return {
    authenticated,
    id,
    text: text || id.charAt(0).toUpperCase() + id.slice(1),
    to: to || '/' + id,
    ...rest,
  };
}

export default {
  db: {
    title: 'CAPE.io',
    tagline: 'Create Anywhere Publish Everywhere',
    'login-join': {
      headerMsg: 'Login or Join',
      leadMsg: 'Enter your email to start the login process.',
      login: {
        headerMsg: 'Login',
        leadMsg: 'Select a login method',
      },
    },
    // @TODO The server needs filter based on permissions besides auth.
    navLinks: [
      createNavLink('chat', {authenticated: true}),
      createNavLink('widgets'),
      createNavLink('survey'),
      createNavLink('about', {text: 'About Us'}),
      createNavLink('login', {authenticated: false, text: 'Login or Join'}),
      createNavLink('logout', {authenticated: true, className: 'logout-link'}),
    ],
  },
};
