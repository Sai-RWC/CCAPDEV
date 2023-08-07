// module.exports = {
//   formatDate: function(date) {
//     const now = new Date();
//     const diffTime = now - date;
//     const diffMinutes = Math.floor(diffTime / (1000 * 60))
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//     const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
//     if (diffMinutes < 60) {
//       return 'Less than an hour ago';
//     } else if (diffHours < 24) {
//       if (diffHours === 1) {
//         return '1 hr ago';
//       } else {
//         return `${diffHours} hrs ago`;
//       }
//     } else if (diffDays < 7) {
//       if (diffDays === 1) {
//         return '1 day ago';
//       } else {
//         return `${diffDays} days ago`;
//       }
//     } else {
//       const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
//       return dateCreated.toLocaleDateString('en-US', options);
//     }
//   }
// }

export const formatDate = (date) => {

  const now = new Date();
  const diffTime = now - date;
  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffMinutes < 60) {
    return 'Less than an hour ago';
  } else if (diffHours < 24) {
    if (diffHours === 1) {
      return '1 hr ago';
    } else {
      return `${diffHours} hrs ago`;
    }
  } else if (diffDays < 7) {
    if (diffDays === 1) {
      return '1 day ago';
    } else {
      return `${diffDays} days ago`;
    }
  } else {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateCreated.toLocaleDateString('en-US', options);
  }

}

// export const loginFormatError = (error) => {
//   if (error.startsWith('User') {
//     return 
//   }
//   else {
//
//   }
// }
