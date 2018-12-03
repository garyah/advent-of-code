#include <unordered_map>
#include <unordered_set>
#include <stdint.h>
#include <vector>

namespace Advent2018
{
    class FabricOverlapCalculator
    {
    public:
        FabricOverlapCalculator()/* :
            m_overlappedArea(0)*/
        {
        }

        void addClaim(const char *claim)
        {
            unsigned id = 0, left = 0, top = 0, width = 0, height = 0;
            (void)sscanf_s(claim, "#%u @ %u,%u: %ux%u", &id, &left, &top, &width, &height);
            unsigned gridHeightNeeded = top + height;
            if (m_fabricGrid.size() < gridHeightNeeded) resizeToHeightNeeded(gridHeightNeeded);
            unsigned gridWidthNeeded = left + width;
            if (m_fabricGrid[0].size() < gridWidthNeeded) resizeToWidthNeeded(gridWidthNeeded);
            putClaimOnGrid(left, top, width, height);
        }

        unsigned getOverlappedArea()
        {
            unsigned overlappedArea = 0;
            for (size_t r = 0; r < m_fabricGrid.size(); ++r)
            {
                for (size_t c = 0; c < m_fabricGrid[r].size(); ++c)
                {
                    if (m_fabricGrid[r][c] > 1)
                    {
                        overlappedArea += 1;
                    }
                }
            }
            return overlappedArea;
        }

        //unsigned getOverlappedArea() { return m_overlappedArea; }

    private:
        typedef std::vector<std::vector<unsigned>> FabricGrid;
        typedef std::vector<unsigned> FabricGridRow;
        //typedef std::unordered_set<unsigned> SomeSetType;
        //typedef std::unordered_map<unsigned, unsigned> SomeMapType;

        void resizeToHeightNeeded(unsigned gridHeightNeeded)
        {
            size_t currentHeight = m_fabricGrid.size();
            size_t currentWidth = currentHeight > 0 ? m_fabricGrid[0].size() : 0;
            for (size_t r = 1; r <= gridHeightNeeded - currentHeight; ++r)
            {
                FabricGridRow row;
                for (size_t c = 1; c <= currentWidth; ++c)
                {
                    row.push_back(0);
                }
                m_fabricGrid.push_back(row);
            }
        }

        void resizeToWidthNeeded(unsigned gridWidthNeeded)
        {
            for (size_t r = 0; r < m_fabricGrid.size(); ++r)
            {
                size_t currentWidth = m_fabricGrid[r].size();
                for (size_t c = 1; c <= gridWidthNeeded - currentWidth; ++c)
                {
                    m_fabricGrid[r].push_back(0);
                }
            }
        }

        void putClaimOnGrid(unsigned left, unsigned top, unsigned width, unsigned height)
        {
            for (size_t r = top; r < top + height; ++r)
            {
                for (size_t c = left; c < left + width; ++c)
                {
                    m_fabricGrid[r][c] += 1;
                }
            }
        }

        //unsigned m_overlappedArea;
        FabricGrid m_fabricGrid;
        //SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
