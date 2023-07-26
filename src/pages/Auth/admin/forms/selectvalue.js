

// const selector = formValueSelector('TicketCreation') // <-- same as form name
// SelectingFormValuesForm = connect(
//   state => {
//     // can select values individually
//     const hasEmailValue = selector(state, 'hasEmail')
//     const favoriteColorValue = selector(state, 'favoriteColor')
//     // or together as a group
//     const { firstName, lastName } = selector(state, 'firstName', 'lastName')
//     return {
//       hasEmailValue,
//       favoriteColorValue,
//       fullName: `${firstName || ''} ${lastName || ''}`
//     }
//   }
// )(SelectingFormValuesForm)

// export default SelectingFormValuesForm