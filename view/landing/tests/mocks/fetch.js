const fetchMock = () => {
    return jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(),
        }),
    );
};

export default fetchMock;
