{
  "rules": {
   "buildingData": {
  ".read": "auth != null",
  ".write": "auth != null && (
    root.child('users').child(auth.uid).child('role').val() === 'admin' ||
    root.child('users').child(auth.uid).child('role').val() === 'manager'
  )",
  "buildingSettings": {
    "privacyOptOuts": {
      "$apartmentNum": {
        ".write": "auth != null && root.child('users').child(auth.uid).child('apartmentNumber').val() == $apartmentNum"
      }
    }
  }
},
"users": {
  ".read": "auth != null && (
    root.child('users').child(auth.uid).child('role').val() === 'admin' ||
    root.child('users').child(auth.uid).child('role').val() === 'manager'
  )",
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
        (!newData.exists() || newData.child('role').val() === 'resident')
      )
    )"
      }
    },

    "supportBackups": {
      ".read": "auth != null && root.child('users').child(auth.uid).child('role').val() === 'admin'",
      ".write": "auth != null && root.child('users').child(auth.uid).child('role').val() === 'admin'"
    }
  }
}














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




Working rules before automatic backup option ---
{
  "rules": {
    // ===== BUILDING DATA =====
    "buildingData": {
      ".read": "auth != null",
      ".write": "auth != null && (
        root.child('users').child(auth.uid).child('role').val() === 'admin' ||
        root.child('users').child(auth.uid).child('role').val() === 'manager'
      )"
    },

    // ===== USERS =====
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

    // ===== SUPPORT BACKUPS =====
    "supportBackups": {
      // Only admin role can read and write
      ".read": "auth != null && root.child('users').child(auth.uid).child('role').val() === 'admin'",
      ".write": "auth != null && root.child('users').child(auth.uid).child('role').val() === 'admin'"
    },

    // ===== DEFAULT FALLBACK =====
    ".read": false,
    ".write": false
  }
}
