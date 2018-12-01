namespace Advent2017
{
    class NumberGenerator
    {
    public:
        NumberGenerator(unsigned initialNumber, unsigned factor, unsigned divisibleBy = 1u) :
            m_number(initialNumber), m_factor(factor), m_divisibleBy(divisibleBy)
        {
        }

        unsigned getNextNumber()
        {
            do
            {
                uint64_t product = (uint64_t)m_number * m_factor;
                m_number = calculateMaxSigned32BitRemainder(product);
            } while ((m_number % m_divisibleBy) != 0);
            return m_number;
        }

    private:
        unsigned calculateMaxSigned32BitRemainder(uint64_t value)
        {
            return value % INT_MAX;
        }

        unsigned m_number;
        unsigned m_factor;
        unsigned m_divisibleBy;
    };
}
