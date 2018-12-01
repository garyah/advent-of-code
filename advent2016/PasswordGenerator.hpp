#include "../advent2016/HashInputGenerator.hpp"

namespace Advent2016
{
    class PasswordGenerator
    {
    public:
        PasswordGenerator() :
            m_password()
        {
        }

        void generateInOrder(const char *doorId)
        {
            HashInputGenerator generator;
            unsigned hash = 0;
            for (int i = 0; i < 8; ++i)
            {
                generator.generate(doorId, hash);
                hash = generator.getHashInputDecimal() + 1;
                m_password.append(1, *(generator.getHashOutputString() + 5));
            }
        }

        void generateByPosition(const char *doorId)
        {
            HashInputGenerator generator;
            unsigned hash = 0, count = 0;
            for (int i = 0; i < 8; ++i) { m_password.append(1, ' '); }
            while (count < 8)
            {
                generator.generate(doorId, hash);
                hash = generator.getHashInputDecimal() + 1;
                size_t position = *(generator.getHashOutputString() + 5) - '0';
                if (position < 8 && m_password[position] == ' ')
                {
                    m_password[position] = *(generator.getHashOutputString() + 6);
                    ++count;
                }
            }
        }

        const char *getPassword() const
        {
            return m_password.c_str();
        }

    private:
        std::string m_password;
    };
}
