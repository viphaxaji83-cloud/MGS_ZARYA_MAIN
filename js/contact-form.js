(function () {
  var form = document.getElementById('contactForm');
  var status = document.getElementById('contactFormStatus');

  if (!form || !status) {
    return;
  }

  var submitButton = form.querySelector('button[type="submit"]');
  var submitLabel = submitButton ? submitButton.querySelector('.btn__label') : null;
  var defaultButtonText = submitLabel ? submitLabel.textContent : '';
  var formUrl = form.querySelector('#contactFormUrl');
  var fields = [
    { selector: '#name', name: 'name', required: true },
    { selector: '#email', name: 'email', required: true },
    { selector: '#org', name: 'organization', required: false },
    { selector: '#message', name: 'message', required: true },
  ];

  fields.forEach(function (fieldConfig) {
    var field = form.querySelector(fieldConfig.selector);

    if (!field) {
      return;
    }

    field.name = fieldConfig.name;
    field.required = fieldConfig.required;
  });

  if (formUrl && window.location.protocol.indexOf('http') === 0) {
    formUrl.value = window.location.href;
  }

  function showStatus(type, message) {
    status.className = 'contact-form__status is-visible contact-form__status--' + type;
    status.textContent = message;
  }

  function setSubmittingState(isSubmitting) {
    if (!submitButton) {
      return;
    }

    submitButton.disabled = isSubmitting;
    submitButton.setAttribute('aria-busy', String(isSubmitting));

    if (submitLabel) {
      submitLabel.textContent = isSubmitting ? 'Отправляем...' : defaultButtonText;
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (window.location.protocol === 'file:') {
      showStatus(
        'error',
        'Для реальной отправки откройте сайт через домен или локальный сервер, а не напрямую как HTML-файл.'
      );
      return;
    }

    if (!form.reportValidity()) {
      return;
    }

    setSubmittingState(true);
    status.className = 'contact-form__status';
    status.textContent = '';

    var formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Request failed');
        }

        return response.json().catch(function () {
          return {};
        });
      })
      .then(function (result) {
        if (result && (result.success === false || result.success === 'false')) {
          throw new Error('Service rejected');
        }

        form.reset();
        showStatus(
          'success',
          'Сообщение отправлено. Мы получили заявку на mgszarya@mkgtu.ru и свяжемся с вами.'
        );
      })
      .catch(function () {
        showStatus(
          'error',
          'Не удалось отправить сообщение. Попробуйте еще раз через пару минут или напишите на mgszarya@mkgtu.ru.'
        );
      })
      .finally(function () {
        setSubmittingState(false);
      });
  });
})();
