#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/GridMoveParser.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(GridMoveParserTests)
    {
    public:
        
        TEST_METHOD(TestMethod01a1)
        {
            GridMoveParser parser;
            char input[] = "R2, L3";
            parser.parse(input);
            auto shortestPathDistance = parser.getShortestPathDistance();
            Assert::AreEqual((float)5, (float)shortestPathDistance, 0.f);
        }

        TEST_METHOD(TestMethod01a2)
        {
            GridMoveParser parser;
            char input[] = "R2, R2, R2";
            parser.parse(input);
            auto shortestPathDistance = parser.getShortestPathDistance();
            Assert::AreEqual((float)2, (float)shortestPathDistance, 0.f);
        }

        TEST_METHOD(TestMethod01a3)
        {
            GridMoveParser parser;
            char input[] = "R5, L5, R5, R3";
            parser.parse(input);
            auto shortestPathDistance = parser.getShortestPathDistance();
            Assert::AreEqual((float)12, (float)shortestPathDistance, 0.f);
        }

        TEST_METHOD(RotatingLeftFromNorthGoesWest)
        {
            GridMoveParser parser;
            char input[] = "L5, R5, R3";
            parser.parse(input);
            auto shortestPathDistance = parser.getShortestPathDistance();
            Assert::AreEqual((float)7, (float)shortestPathDistance, 0.f);
        }

        TEST_METHOD(TestMethod01b1)
        {
            GridMoveParser parser;
            char input[] = "R8, R4, R4, R8";
            parser.parse(input);
            auto distanceToFirstRevisit = parser.getDistanceToFirstRevisit();
            Assert::AreEqual((float)4, (float)distanceToFirstRevisit, 0.f);
        }

    };
}
