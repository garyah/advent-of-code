#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/ProgramDancer.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

namespace advent2017tests
{
    TEST_CLASS(ProgramDancerTests)
    {
    public:
        TEST_METHOD(MovesFromSampleReturnsCorrectFinal)
        {
            std::string finalPositions;
            ProgramDancer::DanceWithNumberOfProgramsAndMoveListAndReturnFinalPositions(
                5, "s1,x3/4,pe/b", finalPositions);
            Assert::AreEqual("baedc", finalPositions.data());
        }

        //TEST_METHOD(MovesFromSampleReturnsCorrectFinalAfterBillionDances)
        //{
        //    std::string finalPositions;
        //    ProgramDancer::DanceWithNumberOfProgramsAndMoveListAndReturnFinalPositions(
        //        5, "s1,x3/4,pe/b", finalPositions, 1000*1000*10);
        //    Assert::AreEqual("baedc", finalPositions.data());
        //}
    };
}
