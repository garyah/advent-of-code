#include <cctype>
#include <unordered_map>
#include <unordered_set>
#include <string>
#include <vector>

namespace Advent2018
{
    class PolymerReactor
    {
    public:
        PolymerReactor()/* :
            m_someField(0)*/
        {
        }

        unsigned getNumUnitsRemainingAfterReaction(char *input)
        {
			for (auto p = input; *p != 0; ++p)
			{
				if (*(p + 1) == 0) continue;
				if (*p != *(p + 1)
					&& (*p == tolower(*(p + 1))
						|| *(p + 1) == tolower(*p)))
				{
					for (auto q = (p + 2); *q != 0; ++p, ++q)
					{
						*p = *q;
					}
					*p = 0;
					p = input - 1;
				}
			}
			return (unsigned)strlen(input);
        }

		unsigned getLengthOfShortestPolymerAfterReactionRemovingUnitType(char *input)
        {
			unsigned lengthOfShortestPolymer = 2 * 1024 * 1024 * 1024;
			std::string copyOfInput(input);
			for (auto type = 'a'; type <= 'z'; ++type)
			{
				for (auto p = input; *p != 0; ++p)
				{
					if (tolower(*p) == type)
					{
						auto pSaved = p;
						for (char *q = (p + 1); *q != 0; ++p, ++q)
						{
							*p = *q;
						}
						*p = 0;
						p = pSaved - 1;
					}
				}
				auto numUnits = getNumUnitsRemainingAfterReaction(input);
				if (numUnits < lengthOfShortestPolymer) lengthOfShortestPolymer = numUnits;
				(void)strcpy(input, copyOfInput.c_str());
			}
			return lengthOfShortestPolymer;
        }

        //int64_t getSomeField() { return m_someField; }

    private:
        typedef std::vector<int64_t> SomeVectorType;
        typedef std::unordered_set<int64_t> SomeSetType;
        typedef std::unordered_map<int64_t, unsigned> SomeMapType;

        //int64_t m_someField;
        //SomeVectorType m_someVector;
        //SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
