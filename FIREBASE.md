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
        ".read": "auth != null && (
          auth.uid === $uid ||
          root.child('users').child(auth.uid).child('role').val() === 'admin' ||
          root.child('users').child(auth.uid).child('role').val() === 'manager'
        )",
        ".write": "auth != null && (
          root.child('users').child(auth.uid).child('role').val() === 'admin' ||
          (
            root.child('users').child(auth.uid).child('role').val() === 'manager' &&
            newData.child('role').val() === 'resident'
          )
        )"
      }
    },
    
    // Root-level read for admin backups
    ".read": "auth != null && root.child('users').child(auth.uid).child('role').val() === 'admin'",
    ".write": false
  }
}
