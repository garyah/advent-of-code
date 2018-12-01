#include <string>

namespace Advent2016
{
    class PasswordScrambler
    {
    public:
        PasswordScrambler() :
            m_password()
        {
        }

        void addRule(const char *rule)
        {
        }

        void scramble(const char *password)
        {
        }

        const char *getPassword() const
        {
            return m_password.c_str();
        }

    private:

    private:
        std::string m_password;
    };
}
