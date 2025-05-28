import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi'
import Logo from './Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', path: '/#features' },
        { name: 'Pricing', path: '/#pricing' },
        { name: 'Communities', path: '/communities' },
        { name: 'Services', path: '/communities/all/services' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '/docs' },
        { name: 'Tutorials', path: '/tutorials' },
        { name: 'Blog', path: '/blog' },
        { name: 'Support', path: '/support' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Privacy', path: '/privacy' },
        { name: 'Terms', path: '/terms' },
      ]
    }
  ]
  
  const socialLinks = [
    { icon: <FiTwitter size={20} />, path: 'https://twitter.com' },
    { icon: <FiInstagram size={20} />, path: 'https://instagram.com' },
    { icon: <FiFacebook size={20} />, path: 'https://facebook.com' },
    { icon: <FiGithub size={20} />, path: 'https://github.com' },
  ]

  return (
    <footer className="bg-dark-lighter pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-light-darker max-w-md">
              The ultimate platform for musicians to build communities, offer services, and collaborate on projects.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-light-darker hover:text-primary transition-colors duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-light-darker hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-darker text-sm">
            &copy; {currentYear} MusicianHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-light-darker hover:text-primary text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-light-darker hover:text-primary text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-light-darker hover:text-primary text-sm transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
