const User = require('../models/userModel');

const verifyRoleAndPermission = (requiredPermissions) => (req, res, next) => {
  const user = req.user; 
  if (!user) {
    return res.status(401).json('User not authenticated');
  }

  User.findById(user.id)
    .then(user => {
      if (!user) {
        return res.status(404).json('User not found');
      }

     
      const rolePermissions = {
        Taquilla: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
        Organizador: ['CREATE', 'READ', 'UPDATE'],
        Participante: ['READ']
      };

      const userPermissions = rolePermissions[user.role] || [];

      const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
      if (!hasAllPermissions) {
        return res.status(403).json('Access denied');
      }

      next();
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = verifyRoleAndPermission;
