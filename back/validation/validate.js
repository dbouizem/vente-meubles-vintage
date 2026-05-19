const validateBody = (schema, body) => {
  const result = schema.safeParse(body);

  if (result.success) {
    return { data: result.data, error: null };
  }

  return {
    data: null,
    error: result.error.issues.map((issue) => {
      const fieldName = issue.path[0];

      if (fieldName === 'prix') {
        return 'Prix invalide';
      }

      if (fieldName === 'password') {
        return 'Mot de passe est obligatoire';
      }

      if (fieldName === 'description') {
        return 'Description est obligatoire';
      }

      if (fieldName === 'titre') {
        return 'Titre est obligatoire';
      }

      if (fieldName === 'email' && issue.code !== 'invalid_format') {
        return 'Email est obligatoire';
      }

      return issue.message;
    }).join(', '),
  };
};

module.exports = { validateBody };
