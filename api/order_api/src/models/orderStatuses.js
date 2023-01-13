const orderStatuses = {
    Unknown: {
        id: 1,
        text: ''
    },
    WaitingForPayment: {
        id: 2,
        text: 'En attente de paiement'
    },
    PaymentCancelled: {
        id: 3,
        text: 'Paiement annulé'
    },
    PaymentFailed: {
        id: 4,
        text: 'Paiement raté'
    },
    WaitingRestaurantConfirmation: {
        id: 5,
        text: 'En attente de préparation'
    },
    CookingProgress: {
        id: 6,
        text: 'Préparation en cours'
    },
    WaitingDeliverymanConfirmation: {
        id: 7,
        text: ''
    },
    WaitingDeliverymanPickUp: {
        id: 8,
        text: ''
    },
    DeliveryInProgress: {
        id: 9,
        text: ''
    },
    Delivered: {
        id: 10,
        text: ''
    }
}

module.exports = orderStatuses