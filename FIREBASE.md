{
  "rules": {
    // Building payment and project data
    "buildingData": {
      ".read": "auth != null",
      ".write": "auth != null && (
        root.child('users').child(auth.uid).child('role').val() === 'admin' ||
        root.child('users').child(auth.uid).child('role').val() === 'manager'
      )"
    },

    // User management
    "users": {
      "$uid": {
        // Everyone logged in can read their own record;
        // Admins & managers can read all users (for assigning roles, etc.)
        ".read": "auth != null && (
          auth.uid === $uid ||
          root.child('users').child(auth.uid).child('role').val() === 'admin' ||
          root.child('users').child(auth.uid).child('role').val() === 'manager'
        )",

        // Write rules (creating or editing users)
        ".write": "auth != null && (
          // Admin can write any user
          root.child('users').child(auth.uid).child('role').val() === 'admin' ||

          // Manager can only create or edit RESIDENTS
          (
            root.child('users').child(auth.uid).child('role').val() === 'manager' &&
            newData.child('role').val() === 'resident'
          )
        )"
      }
    }
  }
}
