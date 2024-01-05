const { addUser } = require('../controller/users');
const UserModel = require("../models/Users");

describe('addUser function', () => {
  afterAll(() => {
    jest.restoreAllMocks();
   
  });

  test('should create a new user when email does not exist', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking UserModel.findOne to simulate that the user does not exist
    jest.spyOn(UserModel, 'findOne').mockReturnValue(null);

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "L'utilisateur a été créé avec succès !" });
  });

  test('should return a 409 status when email already exists', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking UserModel.findOne to simulate that the user already exists
    jest.spyOn(UserModel, 'findOne').mockReturnValue({ name: 'John Doe', email: 'john@example.com' });

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Cet email est déjà utilisé. Veuillez choisir un autre.' });
  });
});
