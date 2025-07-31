const User = require('../models/User');

exports.migrateUserRoles = async () => {
  try {
    console.log('Starting user role migration...');

    // Find all users that still have the old isAdmin field
    const usersToMigrate = await User.find({ isAdmin: { $exists: true } });

    if (usersToMigrate.length === 0) {
      console.log('No users need migration. All users already have role field.');
      return;
    }

    console.log(`Found ${usersToMigrate.length} users to migrate...`);

    for (const user of usersToMigrate) {
      // Convert isAdmin boolean to role string
      const newRole = user.isAdmin ? 'admin' : 'user';

      // Update the user with new role field and remove old isAdmin field
      await User.findByIdAndUpdate(user._id, {
        $set: { role: newRole },
        $unset: { isAdmin: 1 },
      });

      console.log(`Migrated user ${user.email} from isAdmin: ${user.isAdmin} to role: ${newRole}`);
    }

    console.log('User role migration completed successfully!');
  } catch (error) {
    console.error('Error during user role migration:', error);
    throw error;
  }
};
