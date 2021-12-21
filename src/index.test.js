const mockQuery = jest.fn();
jest.mock('mysql2', () => ({
  createConnection: () => ({
    connect: jest.fn(),
    query: mockQuery,
  }),
}));

const Action = require('./messenger/action.messenger');

describe('action.messenger.js', () => {
  describe('name flow', () => {
    const mockSendText = jest.fn();
    const mockSetState = jest.fn();

    beforeEach(async () => {
      await Action.Main({
        event: { text: 'Ivan' },
        state: { nama: '' },
        sendText: mockSendText,
        setState: mockSetState,
        session: { _state: {}, user: {} },
      });
    });

    it('should save state and data into messages', () => {
      expect(mockSetState).toHaveBeenCalledWith({
        nama: 'Ivan',
        chat: 'Ivan',
      });
      expect(mockQuery).toHaveBeenCalledTimes(0);
    });
    it('should send correct text', () => {
      expect(mockSendText).toHaveBeenCalledWith(
        'Hello Ivan, when is your birthday? Please answer in YYYY-MM-DD format.'
      );
    });
  });
});
