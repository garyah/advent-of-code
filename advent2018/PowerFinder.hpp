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
			const auto totalSize = 300u;
			auto maxPower = -1000;
			auto xMax = 0u, yMax = 0u;
			auto x = 1u, y = 1u, maxDimension = totalSize - 2u;
			for (; y <= maxDimension; ++y)
			{
				for (x = 1u; x <= maxDimension; ++x)
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
			const auto totalSize = 300u;
			int powerValues[totalSize+1][totalSize+1] = { 0 };
			for (auto y = 1u; y <= totalSize; ++y)
			{
				for (auto x = 1u; x <= totalSize; ++x)
				{
					powerValues[x][y] = calculatePower(x, y);
				}
			}

			auto maxPower = -1000;
			auto xMax = 0u, yMax = 0u, sizeMax = 0u;
			auto x = 1u, y = 1u, maxDimension = totalSize;
			for (auto size = 2u; size <= totalSize - 1; ++size)
			{
				maxDimension = totalSize - size + 1;
				for (y = 1u; y <= maxDimension; ++y)
				{
					for (x = 1u; x <= maxDimension; ++x)
					{
						auto anyPower = 0;
						for (auto yThis = y; yThis < y + size; ++yThis)
						{
							for (auto xThis = x; xThis < x + size; ++xThis)
							{
								anyPower += powerValues[xThis][yThis];
							}
						}
						testCalculateAnyPower(x, y, size, anyPower);
						if (anyPower > maxPower)
						{
							maxPower = anyPower, xMax = x, yMax = y, sizeMax = size;
						}
					}
				}
			}

			std::cout << "last x= " << x << " last y= " << y << std::endl;
			std::cout << "maxPower= " << maxPower << std::endl;
			char result[80 + 1] = { 0 };
			(void)snprintf(result, _countof(result), "%u,%u,%u", xMax, yMax, sizeMax);
			std::string resultString(result);
			return resultString;
		}

		void testCalculateAnyPower(unsigned x, unsigned y, unsigned size, int anyPower)
		{
			if (x == 90u && y == 269u && m_gridSerial == 18
				|| x == 232u && y == 251u && m_gridSerial == 42)
			{
				std::cout << "test " << m_gridSerial << ": @(" << x << "," << y << "," << size << ") -> ";
				std::cout << anyPower << std::endl;
			}
		}

		int calculatePower(unsigned x, unsigned y)
		{
			auto rackId = x + 10u;
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
