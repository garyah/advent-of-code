#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2018/FabricOverlapCalculator.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2018;

namespace advent2018tests
{
    TEST_CLASS(FabricOverlapCalculatorTests)
    {
    public:
        TEST_METHOD(PartOneSampleGivesCorrectOverlappedArea)
        {
            FabricOverlapCalculator blank;
            blank.addClaim("#1 @ 1,3: 4x4");
            blank.addClaim("#2 @ 3,1: 4x4");
            blank.addClaim("#3 @ 5,5: 2x2");
            Assert::AreEqual(4, (int)blank.getOverlappedArea());
        }
        TEST_METHOD(PartTwoSampleGivesCorrectIdOfNonOverlappedClaim)
        {
            FabricOverlapCalculator blank;
            blank.addClaim("#1 @ 1,3: 4x4");
            blank.addClaim("#2 @ 3,1: 4x4");
            blank.addClaim("#3 @ 5,5: 2x2");
            Assert::AreEqual(3, (int)blank.getIdOfNonOverlappedClaim());
        }
    };
}
