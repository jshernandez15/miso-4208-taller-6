var {defineSupportCode} = require('cucumber');
var {expect} = require('chai');

defineSupportCode(({Given, When, Then}) => {
  Given('I go to losestudiantes home screen', () => {
    browser.url('/');
    if(browser.isVisible('button=Cerrar')) {
      browser.click('button=Cerrar');
    }
  });

  When('I open the login screen', () => {
    browser.waitForVisible('button=Ingresar', 5000);
    browser.click('button=Ingresar');
  });

  When(/^I fill with (.*) and (.*)$/ , (email, password) => {
      var cajaLogIn = browser.element('.cajaLogIn');

      var mailInput = cajaLogIn.element('input[name="correo"]');
      mailInput.click();
      mailInput.keys(email);

      var passwordInput = cajaLogIn.element('input[name="password"]');
      passwordInput.click();
      passwordInput.keys(password)
  });


  When('I try to login', () => {
    var cajaLogIn = browser.element('.cajaLogIn');
    cajaLogIn.element('button=Ingresar').click()
  });

  Then('I expect to see {string}', error => {
      browser.waitForVisible('.aviso.alert.alert-danger', 5000);
      var alertText = browser.element('.aviso.alert.alert-danger').getText();
      expect(alertText).to.include(error);
  });

  Then('I expect to be logged in', () => {
      var header = browser.element('.navbar');
      var alertText = header.element('.usrImage');
      expect(alertText).to.not.be.null;
  });
});