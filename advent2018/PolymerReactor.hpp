#include <cctype>
#include <string>

namespace Advent2018
{
    class PolymerReactor
    {
    public:
        PolymerReactor()
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

    private:
    };
}
