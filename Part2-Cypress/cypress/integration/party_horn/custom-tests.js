describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(($el) => {
      expect($el).to.have.value(75);
    });
  });

  it('Volume input changes as the slider changes', ()=>{
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(33);    
    });
  });

  it('Audio changes when slider changes', ()=>{
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#horn-sound').then(($el)=>{
      expect($el).to.have.prop('volume',0.33);
    })
  });

  //rest of the test

  it('Image source changes when select party horn radio', ()=>{
    cy.get('#radio-party-horn').trigger('change');
    cy.get('#sound-image').then(($el)=>{
      expect($el).to.have.attr('src','./assets/media/images/party-horn.svg')
    })
  });

  
  it('sound source changes when select party horn radio', ()=>{
    cy.get('#radio-party-horn').trigger('change');
    cy.get('#horn-sound').then(($el)=>{
      expect($el).to.have.attr('src','./assets/media/audio/party-horn.mp3')
    })
  });

  //volume image tests

  it('volume image changes - mute', ()=> {
    cy.get('#volume-slider').invoke('val',0).trigger('input');
    cy.get('#volume-image').then(($el)=>{
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-0.svg')
    })
  });

  it('volume image changes - level 1', ()=> {
    cy.get('#volume-slider').invoke('val',1).trigger('input');
    cy.get('#volume-image').then(($el)=>{
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-1.svg')
    })
  });

  it('volume image changes - mute', ()=> {
    cy.get('#volume-slider').invoke('val',34).trigger('input');
    cy.get('#volume-image').then(($el)=>{
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-2.svg')
    })
  });

  it('volume image changes - mute', ()=> {
    cy.get('#volume-slider').invoke('val',67).trigger('input');
    cy.get('#volume-image').then(($el)=>{
      expect($el).to.have.attr('src','./assets/media/icons/volume-level-3.svg')
    })
  });

  //honk button disabled

  it('honk button is disabled when textbox is empty', ()=>{
    cy.get('#volume-number').clear();
    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.attr('disabled', 'disabled');
    });    
  });

  it('honk button is disabled when textbox is non-number', ()=>{
    cy.get('#volume-number').clear().type('A');
    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.attr('disabled', 'disabled');
    });    
  });

  //error shown

  it('error is shown when volume textbox input is out of range', ()=>{
    cy.get('#volume-number').clear().type('111');
    cy.get('#honk-btn').trigger('click');
    cy.get('#volume-number').then(($el)=>{
      expect($el).to.have.prop('validationMessage', 'Value must be less than or equal to 100.')
    });
  });

});
