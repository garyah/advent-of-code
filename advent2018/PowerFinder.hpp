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
        PowerFinder(unsigned gridSerial) :
			m_gridSerial(gridSerial)
        {
        }

        std::string getMax3x3Power()
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
							power3x3 += calculatePower(xThis, yThis);
						}
					}
					testCalculate3x3Power(x, y, power3x3);
					if (power3x3 > maxPower)
					{
						maxPower = power3x3;
						xMax = x;
						yMax = y;
					}
				}
			}

			std::cout << "last x= " << x << " last y= " << y << std::endl;
			std::cout << "maxPower= " << maxPower << std::endl;
			char result[80 + 1] = { 0 };
			(void)snprintf(result, _countof(result), "%u,%u", xMax, yMax);
			std::string resultString(result);
            return resultString;
        }

		void testCalculate3x3Power(unsigned x, unsigned y, int power3x3)
		{
			if (x == 33u && y == 45u && m_gridSerial == 18
				|| x == 21u && y == 61u && m_gridSerial == 42)
			{
				std::cout << "test " << m_gridSerial << ": @(" << x << "," << y << ") -> ";
				std::cout << power3x3 << std::endl;
			}
		}

		std::string getMaxAnyPower()
		{
			auto maxPower = -1000;
			auto xMax = 0u;
			auto yMax = 0u;
			auto sizeMax = 0u;
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
							power3x3 += calculatePower(xThis, yThis);
						}
					}
					testCalculate3x3Power(x, y, power3x3);
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
			(void)snprintf(result, _countof(result), "%u,%u,%u", xMax, yMax, sizeMax);
			std::string resultString(result);
			return resultString;
		}

		void testCalculateAnyPower(unsigned x, unsigned y, int anyPower)
		{
			if (x == 90u && y == 269u && m_gridSerial == 18
				|| x == 232u && y == 251u && m_gridSerial == 42)
			{
				std::cout << "test " << m_gridSerial << ": @(" << x << "," << y << ") -> ";
				std::cout << anyPower << std::endl;
			}
		}

		int calculatePower(unsigned x, unsigned y)
		{
			auto rackId = x+ 10u;
			auto power = rackId * y;
			power += m_gridSerial;
			power *= rackId;
			power = power / 100 % 10;
			int finalPower = (int)power - 5;
			testCalculatePower(x, y, finalPower);
			return finalPower;
		}

		void testCalculatePower(unsigned x, unsigned y, int finalPower)
		{
			if (x == 3u && y == 5u && m_gridSerial == 8u
				|| x == 122u && y == 79u && m_gridSerial == 57u
				|| x == 217u && y == 196u && m_gridSerial == 39u
				|| x == 101u && y == 153u && m_gridSerial == 71u)
			{
				std::cout << "test " << m_gridSerial << ": @(" << x << "," << y << ") -> ";
				std::cout << finalPower << std::endl;
			}
		}

    private:
        typedef std::vector<int64_t> SomeVectorType;
        typedef std::unordered_set<int64_t> SomeSetType;
        typedef std::unordered_map<int64_t, unsigned> SomeMapType;

		unsigned m_gridSerial;
        SomeVectorType m_someVector;
        SomeSetType m_someSet;
        SomeMapType m_someMap;
    };
}
