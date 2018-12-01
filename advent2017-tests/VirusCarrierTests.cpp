#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/VirusCarrier.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

namespace advent2017tests
{
    TEST_CLASS(VirusCarrierTests)
    {
    public:
        TEST_METHOD(CanReadSampleMap)
        {
            VirusCarrier carrier;
            carrier.addMapRow("..#");
            carrier.addMapRow("#..");
            carrier.addMapRow("...");
            //Assert::AreEqual((size_t)13*13, carrier.getNumberOfGridNodes());
        }

        TEST_METHOD(SampleMapAfter7MovesReturnsCorrectNumberInfected)
        {
            VirusCarrier carrier;
            carrier.addMapRow("..#");
            carrier.addMapRow("#..");
            carrier.addMapRow("...");
            carrier.moveCarrier(7);
            //Assert::AreEqual((size_t)5, carrier.getNumberInfectedByMoves());
        }
    };
}
