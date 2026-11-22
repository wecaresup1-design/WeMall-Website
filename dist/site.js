const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') === 'false');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});

const dialog = document.querySelector('.demo-dialog');
const dialogTitle = dialog.querySelector('#demo-title');
const dialogNotice = dialog.querySelector('#demo-notice');
const dialogFields = dialog.querySelector('.demo-fields');
const closeButton = dialog.querySelector('.close-dialog');
let dialogTrigger;

const demoFields = {
  enquiry: [['Name'], ['Email', 'email'], ['Message', 'textarea']],
  'sign-in': [['Email', 'email'], ['Password', 'password']],
  order: [['Order number'], ['Email', 'email']],
  return: [['Order number'], ['Email', 'email'], ['Reason for return', 'textarea']],
};

function previewForm(fields, buttonText) {
  const form = document.createElement('form');
  form.className = 'demo-form';
  form.autocomplete = 'off';
  form.addEventListener('submit', (event) => event.preventDefault());

  const fieldset = document.createElement('fieldset');
  fieldset.disabled = true;
  for (const [labelText, kind = 'text'] of fields) {
    const label = document.createElement('label');
    label.textContent = labelText;

    const field = document.createElement(kind === 'textarea' ? 'textarea' : 'input');
    if (kind === 'textarea') {
      field.rows = 3;
    } else {
      field.type = kind;
    }
    label.append(field);
    fieldset.append(label);
  }

  const button = document.createElement('button');
  button.className = 'button';
  button.type = 'button';
  button.disabled = true;
  button.textContent = buttonText;
  fieldset.append(button);
  form.append(fieldset);
  return form;
}

document.querySelectorAll('[data-demo]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogTrigger = button;
    const fields = demoFields[button.dataset.demo];
    dialogTitle.textContent = button.textContent.trim();
    dialogFields.replaceChildren();
    if (fields) {
      dialogNotice.textContent = 'This form is for demonstration only. The fields and submission button are disabled.';
      dialogFields.append(previewForm(fields, dialogTitle.textContent));
    } else {
      dialogNotice.textContent = 'This material is unavailable in the demo.';
    }
    dialog.showModal();
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => dialogTrigger?.focus());

const categories = document.querySelectorAll('[data-category]');
const categoryTitle = document.querySelector('#category-title');

categories.forEach((category) => {
  category.addEventListener('click', () => {
    categories.forEach((option) => option.setAttribute('aria-pressed', String(option === category)));
    categoryTitle.textContent = category.textContent.trim();
  });
});
