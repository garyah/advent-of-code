#include <unordered_map>
#include <unordered_set>
#include <stdint.h>
#include <string>
#include <vector>

namespace Advent2018
{
    class PowerFinder
    {
    public:
        PowerFinder() :
            m_someField(0)
        {
        }

        std::string getMax3x3Power(unsigned gridSerial)
        {
			auto maxPower = -1000;
			auto xMax = 0u;
			auto yMax = 0u;
			auto x = 1u;
			auto y = 1u;
			auto size = 300u - 2u;
			for (; y <= size; ++y)
			{
				for (x = 1u; x <= size; ++x)
				{
					auto power3x3 = 0;
					for (auto yThis = y; yThis < y + 3; ++yThis)
					{
						for (auto xThis = x; xThis < x + 3; ++xThis)
						{
							auto rackId = xThis + 10u;
							auto power = rackId * yThis;
							power += gridSerial;
							power *= rackId;
							power = power / 100 % 10;
							int finalPower = (int)power - 5;
							if (xThis == 3u && yThis == 5u && gridSerial == 8u
								|| xThis == 122u && yThis == 79u && gridSerial == 57u
								|| xThis == 217u && yThis == 196u && gridSerial == 39u
								|| xThis == 101u && yThis == 153u && gridSerial == 71u)
							{
								std::cout << finalPower << std::endl;
							}

							power3x3 += finalPower;
						}
					}
					if (x == 33u && y == 45u && gridSerial == 18)
					{
						std::cout << power3x3 << std::endl;
					}
					if (x == 21u && y == 61u && gridSerial == 42)
					{
						std::cout << power3x3 << std::endl;
					}
					if (power3x3 > maxPower)
					{
						maxPower = power3x3;
						xMax = x;
						yMax = y;
					}
				}
			}

			std::cout << "x= " << x << " y= " << y << std::endl;
			std::cout << "maxPower= " << maxPower << std::endl;
			char result[80 + 1] = { 0 };
			(void)snprintf(result, _countof(result), "%u,%u", xMax, yMax);
			std::string resultString(result);
            return resultString;
        }

        //int64_t getSomeField() { return m_someField; }

    private:
        typedef std::vector<int64_t> SomeVectorType;
        typedef std::unordered_set<int64_t> SomeSetType;
        typedef std::unordered_map<int64_t, unsigned> SomeMapType;

        int64_t m_someField;
        SomeVectorType m_someVector;
        SomeSetType m_someSet;
        SomeMapType m_someMap;
    };
}
