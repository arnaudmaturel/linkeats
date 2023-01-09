/**
 * Mocking client-server processing
 */
const _restaurants = [
    { title: 'McDoonalds', tags: 'Burger - French Fries - Soda' }, 
    { title: 'BurgerKong', tags: 'Burger - French Fries - Soda' }, 
    { title: 'SubRoad', tags: 'Sandwich - Soda' }, 
    { title: "O'Toutouc", tags: 'PacPac' }, 
    { title: 'SuShinois', tags: 'Healthy Foo' }, 
    { title: 'Pizza De Lamama', tags: 'Pizza de la Mama' }, 
    { title: 'MozzaStickss', tags: 'Cheese' }, 
    { title: 'Sevran', tags: 'Gangsta Rap' }, 
    { title: 'Food Night', tags: 'After Night Clubs' }, 
    { title: 'Carrouf', tags: 'All' }, 
    { title: 'Quizz', tags: 'Burger - French Fries - Soda' }
];

export default {
    getRestaurants(cb) {
        setTimeout(() => cb(_restaurants), 100);
    }
};
