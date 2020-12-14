describe("Home page", () => {

    it("should display a search box and a search button", () => {
        cy.visit('/');

        const searchButton = cy.get('#search-button');
        const searchBox =  cy.get('#search-box');

        expect(searchButton).toExist();
        expect(searchBox).toExist();
    });

    it("should display a browse link", ()=>{
        cy.visit('/');

        const browseLink = cy.get('#browse-movies');

        expect(browseLink).toExist();
    });

    it("should display a register link", ()=>{
        cy.visit('/');

        const registerLink = cy.get('#register');

        expect(registerLink).toExist();
    });

    it("should return Star Wars movie after searching for it", ()=>{
        //Setup
        cy.visit('/');


        //Exercise
        const searchBox =  cy.get('#search-box');
        searchBox.type("Star Wars");

        const searchButton = cy.get('#search-button');
        searchButton.click();

        //Assert
        expect(cy.get('img[alt="Star Wars: Episode IV - A New Hope"]')).toExist();
    });

});