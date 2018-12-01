#include <stdio.h>
#include <ctype.h>
#include <map>

namespace Advent2016
{
    class RoomValidator
    {
        typedef std::map<char, unsigned> CountMap;
        typedef std::map<unsigned, std::string> LettersMap;

    public:
        RoomValidator() :
            m_sumOfIds(0),
            m_lastId(0),
            m_lastDecryptedName()
        {
        }

        void addRoom(char *input)
        {
            char name[1000] = { 0 };
            int id = -1;
            char checksum[1000] = { 0 };
            (void)sscanf(input, "%999[-abcdefghijklmnopqrstuvwxyz]%u[%999[abcdefghijklmnopqrstuvwxyz]]", name, &id, checksum);
            if (id >= 0)
            {
                auto result = calculateChecksum(name);
                if (0 == result.compare(checksum))
                {
                    if (name[strlen(name) - 1] == '-') name[strlen(name) - 1] = 0;
                    m_sumOfIds += static_cast<unsigned>(id);
                    m_lastId = id;
                    m_lastDecryptedName = decryptName(name, id);
                }
                else
                {
                    m_lastId = 0;
                    m_lastDecryptedName = std::string();
                }
            }
        }

        unsigned getSumOfIds()
        {
            return m_sumOfIds;
        }

        unsigned getLastId()
        {
            return m_lastId;
        }

        const char *getLastDecryptedName()
        {
            return m_lastDecryptedName.c_str();
        }

    private:
        std::string calculateChecksum(const char *roomName)
        {
            CountMap countMap;
            for (auto p = roomName; *p; ++p)
            {
                if (islower(*p)) { countMap[*p]++; }
            }
            LettersMap lettersMap;
            for (auto i = countMap.begin(); i != countMap.end(); ++i)
            {
                lettersMap[i->second].append(1, i->first);
            }
            std::string result;
            for (auto i = lettersMap.rbegin(); i != lettersMap.rend(); ++i)
            {
                result.append(i->second);
            }
            return result.substr(0, 5);
        }

        std::string decryptName(const char *roomName, unsigned roomId)
        {
            std::string result;
            for (const char *p = roomName; *p; ++p)
            {
                char nextLetter = *p;
                if (islower(nextLetter))
                {
                    for (unsigned i = 0; i < roomId; ++i)
                    {
                        nextLetter = (nextLetter - 'a' + 1) % 26 + 'a';
                    }
                }
                else
                {
                    // make everything else (not just dash) a space
                    nextLetter = ' ';
                }
                result += nextLetter;
            }
            return result;
        }

    private:
        unsigned m_sumOfIds;
        unsigned m_lastId;
        std::string m_lastDecryptedName;
    };
}
